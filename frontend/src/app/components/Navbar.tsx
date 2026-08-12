import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 p-4">
      <ul className="flex justify-center space-x-8 text-lg font-medium">
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        </li>
        <li>
          <Link href="/projects" className="hover:text-blue-600 transition-colors">Projects</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About me</Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}