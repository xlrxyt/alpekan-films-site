"use client";
import Image from "next/image";
import { useState } from "react";
export function ProjectThumbnail({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className="thumbnail-fallback">
        <span className="eyebrow">ALPEKAN / SELECTED WORK</span>
        <span>{title}</span>
      </div>
    );
  return (
    <Image
      src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
      alt={`Video thumbnail for ${title}`}
      width={480}
      height={360}
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}
