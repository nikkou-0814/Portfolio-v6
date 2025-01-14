import { SiGithub } from 'react-icons/si';

export default function footer() {
  return (
    <footer className="text-gray-600 dark:text-gray-300 py-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm">
            © nikkou.dev
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/nikkou-0814"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-400 transition-colors"
            >
              <SiGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}