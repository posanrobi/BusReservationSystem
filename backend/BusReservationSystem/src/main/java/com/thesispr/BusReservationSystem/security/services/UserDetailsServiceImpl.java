package com.thesispr.BusReservationSystem.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thesispr.BusReservationSystem.model.User;
import com.thesispr.BusReservationSystem.repository.UserRepository;

/**
 * Service class that implements the UserDetailsService interface to load user-specific data during authentication.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Loads a user by the given username.
     *
     * @param username The username to load the user for.
     * @return UserDetails object representing the loaded user.
     * @throws UsernameNotFoundException If the user is not found with the given username.
     */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return UserDetailsImpl.build(user);
    }
}
