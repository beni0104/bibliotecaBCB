package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.entity.Review;
import com.example.bibliotecaBCB.data.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
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



}
