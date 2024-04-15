package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.dto.LoanDTO;
import com.example.bibliotecaBCB.data.entity.Book;
import com.example.bibliotecaBCB.data.entity.Loan;
import com.example.bibliotecaBCB.data.entity.User;
import com.example.bibliotecaBCB.data.repository.LoanRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoanService {
    private final LoanRepository loanRepository;
    private final BookService bookService;
    private final UserService userService;

    public LoanService(LoanRepository loanRepository, BookService bookService, UserService userService) {
        this.loanRepository = loanRepository;
        this.bookService = bookService;
        this.userService = userService;
    }

    public List<Loan> findAll(){
        return loanRepository.findAll();
    }

    public void create(LoanDTO loanDTO){
        Loan loan = new Loan();
        loan.setDateLoaned(loanDTO.getDateLoaned());
        Optional<Book> optionalBook = bookService.findById(loanDTO.getBookId());
        if(optionalBook.isPresent()){
            Book book = optionalBook.get();
            loan.setBook(book);
        }

        Optional<User> optionalUser = userService.findById(loanDTO.getUserId());

        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            loan.setUser(user);
            loan.setUserName(user.getUsername());
        } else {
            loan.setUserName(loanDTO.getUserName());
        }

        if(loanDTO.getDateReturned() != null){
            loan.setDateReturned(loanDTO.getDateReturned());
        }

        loanRepository.save(loan);
    }

    public void update(Loan loan){
        loanRepository.save(loan);
    }

}
