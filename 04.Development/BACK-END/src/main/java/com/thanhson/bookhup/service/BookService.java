package com.thanhson.bookhup.service;

import com.thanhson.bookhup.Upload.FileUploadUtil;
import com.thanhson.bookhup.model.Book;
import com.thanhson.bookhup.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(long bookId) {
        return bookRepository.findById(bookId);
    }

    public List<Book> findByTitle(String title) {
        return bookRepository.findByTitle(title);
    }
    public Book saveBook(Book book, MultipartFile imageFile) throws IOException {
        String fileName = StringUtils.cleanPath(imageFile.getOriginalFilename());
        book.setImage(fileName);

        Book savedBook = bookRepository.save(book);

        String uploadDir = "image/" + savedBook.getBookID();

        FileUploadUtil.saveFile(uploadDir, fileName, imageFile);

        // Save the book to your data store

        return savedBook;
    }

    public void deleteBook(long bookId) throws IOException {

        String uploadDir = "image\\" + bookId;

        FileUploadUtil.deleteFile(uploadDir);
        bookRepository.deleteById(bookId);

    }
}
