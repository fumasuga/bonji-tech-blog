import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-14 md:py-28 flex flex-col lg:flex-row items-start">
          <div className="flex flex-col items-start lg:pl-4 lg:w-1/2 text-lg md:text-xl text-gray-500 dark:text-gray-300">
            <a
              href={`/about`}
              className="mx-3 hover:underline mb-4"
            >
              About
            </a>
            <a
              href="https://github.com/fumasuga"
              className="mx-3 hover:underline mb-6 lg:mb-0"
            >
              Contact
            </a>
            <span className="mx-3 mt-6 text-sm text-gray-400 dark:text-gray-500">
              &copy; {new Date().getFullYear()} fuma suga
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
