'use client'
import React from "react";
import { Book } from "@/models/Book";
import { books } from "@/api/books";

export default function Books() {
  const [selectedBook, setSelectedBook] = React.useState(null);

  const handleBookClick = (book: any) => {
    setSelectedBook(selectedBook === book ? null : book);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto pt-8 pb-8 text-white">
        <h1 className="text-4xl font-bold mb-4">📚 MEUS LIVROS 📚</h1>
        <div className="container mx-auto p-4 grid grid-cols-1 mt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {books
            .sort((a, b) => a.title.localeCompare(b.title))
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
