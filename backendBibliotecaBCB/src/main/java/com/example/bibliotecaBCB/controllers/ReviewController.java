package com.example.bibliotecaBCB.controllers;


import com.example.bibliotecaBCB.data.dto.ReviewDTO;
import com.example.bibliotecaBCB.data.entity.Review;
import com.example.bibliotecaBCB.data.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Review>> getAllReviews(){
        return ResponseEntity.ok(reviewService.findAll());
    }

    @PostMapping("/create")
    public ResponseEntity<Review> createReview(@RequestBody ReviewDTO reviewDTO){
        Review review = new Review(reviewDTO.getType(), reviewDTO.getRating(), reviewDTO.getDescription());
        reviewService.save(review);
        return ResponseEntity.ok(review);
    }

}
