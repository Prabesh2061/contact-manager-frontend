import Button from './Button';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
          <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 3h20v18H2V3zm2 2v14h16V5H4zm4 3h8v2H8V8zm0 4h5v2H8v-2z" />
          </svg>
          <span className="text-xl font-bold text-blue-600">Contact Manager</span>
        </div>

        <div className="space-x-4 hidden sm:block">
          <Button label="Login" className="text-blue-600 border border-blue-600 rounded-full" />
          <Button label="Sign Up" className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md" />
        </div>

        <div className="sm:hidden">
          <Button label="☰" className="text-blue-600 border text-2xl focus:outline-none" />
        </div>
      </div>
    </header>
  );
};

export default Header;
