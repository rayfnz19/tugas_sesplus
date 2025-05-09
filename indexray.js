import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from './style.module.css';
import Image from 'next/image';
import Navbar from '../../components/navbarray';

export default function Booklist() {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const deleteBook = async (id) => {
    await fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'DELETE',
    });
    setBooks(books.filter(b => b.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>add book</h1>
        <Link href="/books/add" className={styles.addButton}>tambah buku</Link>

        <ul className={styles.bookList}>
  {books.slice(0, 1).map((b) => (
    <li key={b.id} className={styles.bookItem}>
      <Image src={b.cover} alt={b.title} width={150} height={200} className={styles.cover} />
      <h2 className={styles.bookTitle}>{b.title} by {b.author}</h2>
      <p>{b.category}</p>
      <div className={styles.actions}>
        <button onClick={() => deleteBook(b.id)} className={styles.deleteBook}>Delete</button>
        <button onClick={() => router.push(`/books/${b.id}`)} className={styles.editBook}>Edit</button>
      </div>
    </li>
  ))}
</ul>   

      </div>
    </>
  );
}
