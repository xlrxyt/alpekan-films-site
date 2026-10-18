"use client";
import { Arrow } from "./arrow";
import { useState } from "react";
import { ProjectThumbnail } from "./project-thumbnail";
export function VideoPlayer({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <section aria-label={`Watch ${title}`} className="video-section">
      <div className="film-player">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`${title} — YouTube video player`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            className="video-poster"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
          >
            <ProjectThumbnail videoId={videoId} title={title} />
            <span className="play-control">
              <span className="video-icon" aria-hidden="true">
                <span className="play-triangle" />
              </span>
              <span>Watch the film</span>
            </span>
          </button>
        )}
      </div>
      <div className="video-caption">
        <p>
          {playing
            ? "If playback is unavailable here, open the video on YouTube."
            : "Play to load the YouTube player. Playback connects to YouTube."}
        </p>
        <a
          className="text-link"
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube <Arrow />
        </a>
      </div>
    </section>
  );
}
