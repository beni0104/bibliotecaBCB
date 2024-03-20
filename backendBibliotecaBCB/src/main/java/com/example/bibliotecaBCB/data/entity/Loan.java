package com.example.bibliotecaBCB.data.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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

    public Loan(Date dateLoaned, Date dateReturned) {
        this.dateLoaned = dateLoaned;
        this.dateReturned = dateReturned;
    }
}
