package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.entity.Book;
import com.example.bibliotecaBCB.data.repository.BookRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll(){
        return bookRepository.findAll();
    }

    public void save(Book book){
        bookRepository.save(book);
    }

    public void deleteById(List<Long> ids){
        for(Long id: ids)
            bookRepository.deleteById(id);
    }

    public boolean update(Book book){
        Optional<Book> optionalBook = bookRepository.findById(book.getId());
        if(optionalBook.isPresent()){
            Book updatedBook = optionalBook.get();
            updatedBook.setBookId(book.getBookId());
            updatedBook.setTitle(book.getTitle());
            updatedBook.setAuthor(book.getAuthor());
            updatedBook.setCategory(book.getCategory());
            updatedBook.setAmount(book.getAmount());
            bookRepository.save(updatedBook);
            return true;
        }
        return false;
    }

    public Optional<Book> findById(Long id){
        return bookRepository.findById(id);
    }

    public Page<Book> getPagedBooks(int offset) {
        int limit = 25;
        int page = offset / limit; // calculate page number
        Pageable pageable = PageRequest.of(page, limit);

        return bookRepository.findAll(pageable);
    }

    public List<Book> getRandomBooksByCategory(String category) {
        return bookRepository.findRandomBooksByCategory(category);
    }

}
