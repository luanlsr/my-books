'use client'
import { useEffect, useRef, useState } from "react";
import { Book } from "@/models/Book";
import { books } from "@/api/books";

export default function Books() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [visibleBooks, setVisibleBooks] = useState(10); // Quantidade inicial de livros visíveis
  const booksContainerRef = useRef<HTMLDivElement>(null);

  const handleBookClick = (book: any) => {
    setSelectedBook(selectedBook === book ? null : book);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Verifique se o usuário alcançou o final da lista
      if (
        booksContainerRef.current &&
        window.innerHeight + window.scrollY >= booksContainerRef.current.offsetTop + booksContainerRef.current.clientHeight
      ) {
        // Aumente a quantidade de livros visíveis
        setVisibleBooks((prevVisibleBooks) => prevVisibleBooks + 10);
      }
    };

    // Adicione o evento de scroll ao montar o componente
    window.addEventListener("scroll", handleScroll);

    // Remova o evento ao desmontar o componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto pt-8 pb-8 text-white">
        <h1 className="text-4xl font-bold mb-4 bg-red-500 p-4 rounded-lg">📚 MEUS LIVROS 📚</h1>
        <div
          ref={booksContainerRef}
          className="container mx-auto p-4 grid grid-cols-1 mt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {books
            .sort((a, b) => a.title.localeCompare(b.title))
            .slice(0, visibleBooks)
            .map((book, index) => (
              <div key={index} className="group">
                <div
                  className={`relative mb-4 bg-black rounded-lg shadow-md overflow-hidden book-cover ${selectedBook === book ? 'hidden' : ''}`}
                  onClick={() => handleBookClick(book)}
                >
                  <a href={book.link} target="_blank"><button className="btn btn-primary">Ir para loja</button></a>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full cursor-pointer object-cover"
                  />

                </div>
                <div
                  className={`p-4 flex flex-col justify-center items-center text-center cursor-pointer ${selectedBook === book ? '' : 'hidden'}`}
                  onClick={() => handleBookClick(book)} // Adicione este evento de clique para voltar para a imagem do livro
                >
                  <p className="text-xl font-semibold mb-2">{book.title}</p>
                  <p><strong>Autor:</strong> {book.author}</p>
                  <p><strong>Ano de publicação:</strong> {book.publishedYear}</p>
                  <p><strong>Gênero:</strong> {book.genre}</p>
                  <p><strong>ISBN:</strong> {book.ISBN}</p>
                  <p><strong>Número de páginas:</strong> {book.pageCount}</p>
                  <p><strong>Idioma:</strong> {book.language}</p>
                  <p><strong>Editora:</strong> {book.publisher || "N/A"}</p>
                  <p><strong>Resumo:</strong> {book.summary || "N/A"}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
