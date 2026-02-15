import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  try {
    // Check if env vars are available
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.warn("Supabase env vars not configured, skipping auth middleware");
      return supabaseResponse;
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refresh session if expired
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Get user profile type if authenticated
    let userType: "candidato" | "empresa" | null = null;
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("tipo")
        .eq("id", user.id)
        .single();
      
      userType = profile?.tipo as "candidato" | "empresa" | null;
    }

    // Protect dashboard routes - only candidatos
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      if (userType === "empresa") {
        return NextResponse.redirect(new URL("/empresa/dashboard", request.url));
      }
    }

    // Protect empresa dashboard routes - only empresas
    if (request.nextUrl.pathname.startsWith("/empresa")) {
      if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      if (userType === "candidato") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    // Redirect authenticated users away from auth pages based on type
    if (
      user &&
      (request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/cadastro")
    ) {
      if (userType === "empresa") {
        return NextResponse.redirect(new URL("/empresa/dashboard", request.url));
      } else if (userType === "candidato") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        // No profile found, redirect to cadastro
        return NextResponse.redirect(new URL("/cadastro", request.url));
      }
    }

    return supabaseResponse;
  } catch (error) {
    // If Supabase fails, log error but don't crash
    console.error("Middleware error:", error);
    return supabaseResponse;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
