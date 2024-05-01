package com.example.bibliotecaBCB.data.entity;

import com.example.bibliotecaBCB.data.enums.LoanRequestStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Table
@NoArgsConstructor
public class LoanRequest {

    @Id
    @SequenceGenerator(name = "loanRequestIdGenerator", initialValue = 1000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "loanRequestIdGenerator")
    private Long id;
    @Enumerated(EnumType.STRING)
    private LoanRequestStatus status = LoanRequestStatus.PROCESSING;
    private Date pickupDate;
    private Date requestedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    public LoanRequest(Date pickupDate, Date requestedDate, User user, Book book) {
        this.pickupDate = pickupDate;
        this.requestedDate = requestedDate;
        this.user = user;
        this.book = book;
    }

    public LoanRequest(Long id, LoanRequestStatus status, Date pickupDate, Date requestedDate, User user, Book book) {
        this.id = id;
        this.status = status;
        this.pickupDate = pickupDate;
        this.requestedDate = requestedDate;
        this.user = user;
        this.book = book;
    }
}
