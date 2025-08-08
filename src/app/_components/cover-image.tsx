"use client"
import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useDarkMode } from "@/hooks/useDarkMode";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const [isDark] = useDarkMode();
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn(`w-10 h-10 md:w-20 md:h-20 ${isDark ? "invert" : ""}`, {
        "": slug,
      })}
      width={30}
      height={30}
    />
  );
  return (
    <div className="w-md ml-2 mr-5 flex items-center justify-center">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;