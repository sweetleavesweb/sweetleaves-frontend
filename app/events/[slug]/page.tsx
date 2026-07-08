import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/blog";
import LearnGardenClub from "../../blog/components/LearnGardenClub";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const description = post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160);

  return {
    title: post.title,
    description,
    alternates: { canonical: `/events/${slug}` },
    openGraph: {
      title: post.title,
      description,
      ...(post.featuredImage && {
        images: [{ url: post.featuredImage.url }],
      }),
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <div className="max-w-[1366px] mx-auto px-4 md:px-[37px] pt-8 md:pt-[120px] pb-8 flex flex-col gap-[30px] items-center">
      <article className="bg-white rounded-[50px] w-full px-5 md:px-[117px] pt-[20px] md:pt-[90px] pb-[40px] md:pb-[60px] flex flex-col gap-[40px] md:gap-[63px] items-center">
        {post.featuredImage && (
          <div className="relative w-full aspect-[16/9] rounded-[30px] md:rounded-[70px] overflow-hidden md:-mt-[183px]">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              sizes="(max-width: 1366px) 100vw, 1132px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="w-full flex flex-col gap-[39px]">
          <h1 className="font-poppins-bold text-[35px] md:text-[45px] text-dark-green leading-[0.9]">
            {post.title}
          </h1>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <div className="w-full">
          <Link
            href="/events/"
            className="bg-light-gold text-dark-green font-poppins-semibold text-[16px] uppercase px-[25px] py-[14px] rounded-full hover:opacity-90 transition-opacity text-center w-full md:w-auto min-w-[250px] inline-flex items-center justify-center"
          >
            &lt; Back to Events
          </Link>
        </div>
      </article>

      <LearnGardenClub />
    </div>
  );
}
