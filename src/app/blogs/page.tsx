import { redirect } from "next/navigation";

export default function BlogsRedirectPage() {
  // Redirect to the WordPress-managed blog
  redirect("https://blog.zypp.app/");
}
