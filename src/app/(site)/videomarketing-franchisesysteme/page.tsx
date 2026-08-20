import type { Metadata } from "next";
import { VideoLanding } from "@/components/site/video-landing";
import { getVideomarketingPage } from "@/lib/videomarketing";

const page = getVideomarketingPage("videomarketing-franchisesysteme");

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
};

export default function Page() {
  return <VideoLanding page={page} />;
}
