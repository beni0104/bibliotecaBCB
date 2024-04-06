package com.example.bibliotecaBCB.data.dto;

import com.example.bibliotecaBCB.data.entity.Review;
import lombok.Data;

@Data
public class ReviewDTO {
    private double rating;
    private String description;
    private String username;

    public ReviewDTO(Review review) {
        this.rating = review.getRating();
        this.description = review.getDescription();
        this.username = review.getUser().getUsername();
    }

    public ReviewDTO(double rating, String description) {
        this.rating = rating;
        this.description = description;
    }

    public ReviewDTO() {
    }
}
