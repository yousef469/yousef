import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';

export default function BooksPage() {
    const navigate = useNavigate();

    const bookCategories = [
        {
            title: 'Aerospace Engineering',
            books: ['Introduction to Flight - John Anderson', 'Rocket Propulsion Elements - Sutton', 'Aircraft Design - Raymer']
        },
        {
            title: 'Automotive Engineering',
            books: ['Automotive Engineering Fundamentals', 'Race Car Vehicle Dynamics - Milliken', 'Internal Combustion Engines']
        },
        {
            title: 'Physics & Mathematics',
            books: ['University Physics - Young & Freedman', 'Calculus - Stewart', 'Engineering Mathematics - Kreyszig']
        },
        {
            title: 'Electronics',
            books: ['The Art of Electronics - Horowitz', 'Make: Electronics', 'Practical Electronics for Inventors']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate('/learn')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Learn
                </button>

                <div className="flex items-center gap-4 mb-8">
                    <BookOpen className="w-12 h-12 text-rose-400" />
                    <div>
                        <h1 className="text-4xl font-bold">Engineering Books</h1>
                        <p className="text-gray-400">Essential textbooks and resources</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {bookCategories.map((category, index) => (
                        <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-xl font-bold mb-4 text-rose-400">{category.title}</h3>
                            <ul className="space-y-2">
                                {category.books.map((book, bookIndex) => (
                                    <li key={bookIndex} className="flex items-start gap-2 text-gray-300">
                                        <BookOpen className="w-4 h-4 mt-1 flex-shrink-0" />
                                        <span>{book}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <ExternalLink className="w-5 h-5" />
                        Find These Books
                    </h3>
                    <p className="text-gray-300">
                        Search for these books on Amazon, Library Genesis, or your university library.
                        Many are available as PDFs or through online learning platforms.
                    </p>
                </div>
            </div>
        </div>
    );
}
