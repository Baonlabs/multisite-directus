import { headers } from 'next/headers';
import ContactPage from '@/configuration/TechNova/components/ContactPage';

export default async function Contact() {
  const headersList = await headers();
  const hostname = headersList.get('host') || '';

  switch (hostname) {
    case process.env.DOMAIN_1:
      return <ContactPage />;
    
    case process.env.DOMAIN_2:
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact - Domain 2</h1>
            <p className="text-gray-600">Contact page for Domain 2 coming soon...</p>
          </div>
        </div>
      );
    
    default:
      return <ContactPage />;
  }
}