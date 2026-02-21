import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Get user and check if profile exists
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("tipo")
          .eq("id", user.id)
          .single();

        // If profile doesn't exist, redirect to account type selection
        if (!profile) {
          return NextResponse.redirect(`${origin}/auth/tipo-conta`);
        }

        // Redirect based on user type
        if ((profile as any)?.tipo === "empresa") {
          return NextResponse.redirect(`${origin}/empresa/dashboard`);
        }
        return NextResponse.redirect(`${origin}/dashboard`);
      }
    }
  }

  // If there's an error, redirect to login with error message
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
