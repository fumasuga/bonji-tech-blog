import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  slug,
}: Props) {
  return (
    <div className="flex flex-row mb-4 border border-gray-400 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-100 hover:bg-accent transition-colors">
      <CoverImage slug={slug} title={title} src={coverImage} />
      <div className="flex-1 items-center justify-center">
        <h3 className="texxt-sm md:text-xl mb-1 leading-snug">
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="text-xs md:text-lg text-gray-600 dark:text-gray-400">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </div>
  );
}