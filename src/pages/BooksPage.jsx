import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Download, Search } from 'lucide-react';
import { useState } from 'react';

export default function BooksPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const bookCategories = [
        {
            title: 'Classical Mechanics & Dynamics',
            color: 'from-blue-500 to-cyan-600',
            books: [
                { name: 'Classical Mechanics', author: 'Goldstein', file: '[Goldstein] Classical mechanics.pdf' },
                { name: 'Analytical Mechanics (7th Edition)', author: 'Grant R. Fowles', file: '1665496444-analytical.mechanics.by.grant.r.fowles.7th.edition.solutions-yasdl.com.pdf' },
                { name: 'Engineering Mechanics: Dynamics (7th Edition)', author: 'J.L. Meriam & L.G. Kraige', file: 'engineering-mechanics-dynamics-7th-edition-j-l-meriam-l-g-kraige.pdf' },
                { name: 'Vector Mechanics for Engineers: Statics', author: 'Beer, Johnston, Mazurek', file: 'Vector-Mechanics-For-Engineers-Statics-By-Ferdinand-P.-Beer-E.-Russell-Johnston-Jr-David-F.-Mazurek-.pdf' },
                { name: 'Continuum Mechanics & Plasticity', author: 'Various', file: 'Continuum Mechnics & Plasticity.pdf' }
            ]
        },
        {
            title: 'Physics',
            color: 'from-purple-500 to-pink-600',
            books: [
                { name: 'Fundamentals of Physics (9th Extended)', author: 'Halliday, Resnick, Walker', file: 'Fundamentals of Physics 9th Extended.pdf' },
                { name: 'University Physics with Modern Physics (15th Edition)', author: 'Hugh D. Young', file: 'University Physics with Modern Physics 15th Edition By Hugh D. Young_compressed.pdf' },
                { name: 'Physics for Scientists & Engineers with Modern Physics (9th Ed)', author: 'Serway & Jewett', file: 'Serway_Physics_for_Scientists_Engineers_Modern Physics_9th Ed_Serway_Jewett.pdf' },
                { name: 'The Feynman Lectures on Physics (Vol. I, II, III)', author: 'Richard P. Feynman', file: 'The Feynman Lectures on Physics, Vol. I,II,III The New Millennium Edition by Richard P. Feynman (z-lib.org).pdf' },
                { name: 'Introduction to Quantum Mechanics', author: 'Griffiths', file: 'Griffiths - Introduction to quantum mechanics.pdf' },
                { name: 'Statistical Mechanics', author: 'R.K. Pathria', file: 'Pathria, R. K.  Statistical Mechanics.pdf' }
            ]
        },
        {
            title: 'Mathematics',
            color: 'from-green-500 to-emerald-600',
            books: [
                { name: 'Calculus: Early Transcendentals (6th Edition)', author: 'Stewart', file: 'Calculus - Early Transcendentals 6e.pdf' },
                { name: 'Linear Algebra and Its Applications', author: 'Gilbert Strang', file: 'Gilbert_Strang_Linear_Algebra_and_Its_Applicatio_230928_225121.pdf' },
                { name: 'Principles of Mathematical Analysis', author: 'Rudin', file: 'Principles_of_Mathematical_Analysis-Rudin.pdf' },
                { name: 'Concrete Mathematics: A Foundation for Computer Science', author: 'Graham, Knuth, Patashnik', file: 'Concrete Mathematics A Foundation for Computer Science~tqw~_darksiderg.pdf' },
                { name: 'Introduction to Probability', author: 'Bertsekas & Tsitsiklis', file: 'Math--Bertsekas_Tsitsiklis_Introduction_to_probability.pdf' },
                { name: 'Discrete Mathematics and Its Applications (7th Edition)', author: 'Rosen', file: 'rosen_discrete_mathematics_and_its_applications_7th_edition.pdf' },
                { name: 'Mathematics Textbook (Math 111)', author: 'Various', file: 'textbook-math111.pdf' }
            ]
        },
        {
            title: 'Aerospace Engineering',
            color: 'from-orange-500 to-red-600',
            books: [
                { name: 'Introduction to Flight (8th Edition)', author: 'John D. Anderson', file: 'introduction-to-flight-8th-edition-pdf-free.pdf' }
            ]
        },
        {
            title: 'Algebra',
            color: 'from-yellow-500 to-amber-600',
            books: [
                { name: 'Algebra', author: 'Artin', file: 'ArtinAlgebra.pdf' }
            ]
        }
    ];

    const allBooks = bookCategories.flatMap(cat => 
        cat.books.map(book => ({ ...book, category: cat.title, color: cat.color }))
    );

    const filteredBooks = searchTerm 
        ? allBooks.filter(book => 
            book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.category.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : null;

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
                        <h1 className="text-4xl font-bold">Engineering Books Library</h1>
                        <p className="text-gray-400">{allBooks.length} essential textbooks and resources</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search books by title, author, or category..."
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white focus:border-rose-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Search Results or Categories */}
                {filteredBooks ? (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Search Results ({filteredBooks.length})</h2>
                        {filteredBooks.length === 0 ? (
                            <div className="text-center py-12 text-gray-400">
                                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p>No books found matching "{searchTerm}"</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {filteredBooks.map((book, index) => (
                                    <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-rose-500 transition-all">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold mb-2">{book.name}</h3>
                                                <p className="text-gray-400 mb-2">by {book.author}</p>
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${book.color} text-white`}>
                                                    {book.category}
                                                </span>
                                            </div>
                                            <a
                                                href={`/books section/${book.file}`}
                                                download
                                                className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors whitespace-nowrap"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-8">
                        {bookCategories.map((category, index) => (
                            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                                    {category.title} ({category.books.length})
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {category.books.map((book, bookIndex) => (
                                        <div key={bookIndex} className="bg-gray-900 rounded-lg p-4 hover:bg-gray-700 transition-all">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <h4 className="font-bold mb-1 text-white">{book.name}</h4>
                                                    <p className="text-sm text-gray-400">{book.author}</p>
                                                </div>
                                                <a
                                                    href={`/books section/${book.file}`}
                                                    download
                                                    className="flex items-center gap-1 px-3 py-2 bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors text-sm whitespace-nowrap"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    PDF
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        About This Library
                    </h3>
                    <p className="text-gray-300">
                        All books are available for download in PDF format. These are essential textbooks for engineering students covering mechanics, physics, mathematics, and aerospace engineering. Click the download button to save any book to your device.
                    </p>
                </div>
            </div>
        </div>
    );
}
