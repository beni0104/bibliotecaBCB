package com.example.bibliotecaBCB.data.service;

import com.example.bibliotecaBCB.data.dto.LoanRequestDTO;
import com.example.bibliotecaBCB.data.entity.Book;
import com.example.bibliotecaBCB.data.entity.LoanRequest;
import com.example.bibliotecaBCB.data.entity.User;
import com.example.bibliotecaBCB.data.repository.LoanRequestRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class LoanRequestService {
    private final LoanRequestRepository loanRequestRepository;
    private final UserService userService;
    private final BookService bookService;


    public LoanRequestService(LoanRequestRepository loanRequestRepository, UserService userService, BookService bookService) {
        this.loanRequestRepository = loanRequestRepository;
        this.userService = userService;
        this.bookService = bookService;
    }

    public List<LoanRequest> findAll(){
        return loanRequestRepository.findAll();
    }

    public LoanRequestDTO create(LoanRequestDTO loanRequestDTO){

        Optional<Book> optionalBook = bookService.findById(loanRequestDTO.getBookId());
        Optional<User> optionalUser = userService.findById(loanRequestDTO.getUserId());

        if(optionalBook.isPresent() && optionalUser.isPresent()){
            LoanRequest loanRequest = new LoanRequest(
                    loanRequestDTO.getPickupDate(),
                    new Date(),
                    optionalUser.get(),
                    optionalBook.get()
            );

            loanRequestRepository.save(loanRequest);
        }
        return loanRequestDTO;
    }

    public LoanRequestDTO update(LoanRequestDTO loanRequestDTO){

        Optional<Book> optionalBook = bookService.findById(loanRequestDTO.getBookId());
        Optional<User> optionalUser = userService.findById(loanRequestDTO.getUserId());

        if(optionalBook.isPresent() && optionalUser.isPresent()){
            LoanRequest loanRequest = new LoanRequest(
                    loanRequestDTO.getId(),
                    loanRequestDTO.getStatus(),
                    loanRequestDTO.getPickupDate(),
                    loanRequestDTO.getRequestedDate(),
                    optionalUser.get(),
                    optionalBook.get()
            );

            loanRequestRepository.save(loanRequest);
        }
        return loanRequestDTO;
    }

}
