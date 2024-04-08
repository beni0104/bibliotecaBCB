package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.dto.ReviewDTO;
import com.example.bibliotecaBCB.data.entity.Book;
import com.example.bibliotecaBCB.data.entity.Review;
import com.example.bibliotecaBCB.data.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserService userService;
    private final BookService bookService;

    public ReviewService(ReviewRepository reviewRepository, UserService userService, BookService bookService) {
        this.reviewRepository = reviewRepository;
        this.userService = userService;
        this.bookService = bookService;
    }

    public List<Review> findAll(){
        return reviewRepository.findAll();
    }

    public void save(Review review){
        reviewRepository.save(review);
    }

    public void update(Review review){
        reviewRepository.save(review);
    }

    public List<Review> findByBookId(Long bookId){
        return reviewRepository.findByBookId(bookId);
    }

    public boolean addBookReview(ReviewDTO reviewDTO, Long userId, Long bookId){
        Optional<Book> optionalBook = bookService.findById(bookId);
        if(!(userService.findById(userId).isPresent() && optionalBook.isPresent())){
            return false;
        }
        Book book = optionalBook.get();
        Review review = new Review(
                reviewDTO,
                userService.findById(userId).get(),
                book
        );
        int numberOfReviews = book.getReviews().size();
        reviewRepository.save(review);
        book.setAverageRating((float) ((book.getAverageRating() * numberOfReviews) + review.getRating()) /  (numberOfReviews + 1));
        bookService.update(book);
        return true;
    }

    public boolean addOtherReview(ReviewDTO reviewDTO, Long userId){
        if(!userService.findById(userId).isPresent()){
            return false;
        }
        Review review = new Review(
                reviewDTO,
                userService.findById(userId).get()
        );
        reviewRepository.save(review);
        return true;
    }

}
