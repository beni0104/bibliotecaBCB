package com.example.bibliotecaBCB.data.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Loan {

    @Id
    @SequenceGenerator(name = "loanIdGenerator", initialValue = 1000, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "loanIdGenerator")
    private long id;
    private Date dateLoaned;
    private Date dateReturned;
    private String userName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    public Loan(Date dateLoaned, Date dateReturned, String userName, Book book) {
        this.dateLoaned = dateLoaned;
        this.dateReturned = dateReturned;
        this.userName = userName;
        this.book = book;
    }

    public Loan(Date dateLoaned, Date dateReturned, User user, Book book) {
        this.dateLoaned = dateLoaned;
        this.dateReturned = dateReturned;
        this.user = user;
        this.book = book;
    }

    public Loan(Date dateLoaned, Date dateReturned) {
        this.dateLoaned = dateLoaned;
        this.dateReturned = dateReturned;
    }
}
