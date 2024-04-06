package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.dto.ReviewDTO;
import com.example.bibliotecaBCB.data.entity.Review;
import com.example.bibliotecaBCB.data.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
        if(!(userService.findById(userId).isPresent() && bookService.findById(bookId).isPresent())){
            return false;
        }
        Review review = new Review(
                reviewDTO,
                userService.findById(userId).get(),
                bookService.findById(bookId).get()
        );
        reviewRepository.save(review);
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
