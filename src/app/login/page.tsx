import Link from "next/link";

export default function LoginPage() {
  const githubReady = Boolean(
    process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET,
  );

  return (
    <header className="page-hero">
      <p className="eyebrow">Account</p>
      <h1>Sign in</h1>
      <p>
        Member accounts unlock RSVPs, order history, and personalized AI Fit.
        {githubReady
          ? " GitHub sign-in is configured on this environment."
          : " Add AUTH_GITHUB_ID / AUTH_GITHUB_SECRET to enable GitHub sign-in."}
      </p>
      <div className="cta-row" style={{ marginTop: "1.5rem" }}>
        {githubReady ? (
          <Link href="/api/auth/signin/github" className="btn btn-primary">
            Continue with GitHub
          </Link>
        ) : (
          <span className="chip">Auth provider not configured yet</span>
        )}
        <Link href="/" className="btn btn-ghost">
          Back home
        </Link>
      </div>
    </header>
  );
}
