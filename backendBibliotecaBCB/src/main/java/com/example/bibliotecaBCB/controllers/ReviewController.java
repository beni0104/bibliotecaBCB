package com.example.bibliotecaBCB.controllers;


import com.example.bibliotecaBCB.data.dto.ReviewDTO;
import com.example.bibliotecaBCB.data.entity.Review;
import com.example.bibliotecaBCB.data.service.ReviewService;
import com.example.bibliotecaBCB.security.jwt.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {
    private final ReviewService reviewService;
    private final JwtUtils jwtUtils;

    public ReviewController(ReviewService reviewService, JwtUtils jwtUtils) {
        this.reviewService = reviewService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/getbybookid")
    public ResponseEntity<List<ReviewDTO>> getAllReviews(@RequestParam Long id){
        List<Review> reviews = reviewService.findByBookId(id);
        List<ReviewDTO> reviewDTOS = new ArrayList<>();
        for(Review review: reviews){
            ReviewDTO reviewDTO = new ReviewDTO(review);
            reviewDTOS.add(reviewDTO);
        }
        return ResponseEntity.ok(reviewDTOS);
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createReview(@RequestHeader(value="Authorization") String token, @RequestBody ReviewDTO reviewDTO, @RequestParam(required = false) Long bookId){

        Long userId = jwtUtils.extractUserIdFromJWT(token);
        if(userId != null){
            if (bookId != null) {
                if(!reviewService.addBookReview(reviewDTO, userId, bookId))
                    return ResponseEntity.badRequest().build();
            } else {
                if(!reviewService.addOtherReview(reviewDTO, userId))
                    return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok("Review added!");
        }

        return ResponseEntity.badRequest().build();
    }

}
