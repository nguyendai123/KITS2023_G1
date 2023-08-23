package com.thanhson.bookhup.repository;

import com.thanhson.bookhup.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByCreateDateDesc();

    List<Post> findAllByUser_UserIDOrderByCreateDateDesc(long userID);

    Post findByPostID(long postID);


}
