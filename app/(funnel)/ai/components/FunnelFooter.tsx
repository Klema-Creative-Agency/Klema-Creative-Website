export default function FunnelFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 text-center">
        <p className="text-[12px] text-text-dim">
          &copy; {new Date().getFullYear()} Klema Creative. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
