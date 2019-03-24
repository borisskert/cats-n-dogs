package com.github.borisskert.example.springboot.state;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StateRepository extends MongoRepository<State, String> {

    @Query(fields = "{ '_id': 1 }")
    State findTopByOrderByTimestampDesc();

    @Query("{ 'timestamp': { $lte: ?0 } }")
    List<State> findByState_TimestampBefore(LocalDateTime to);

    @Query("{ 'timestamp': { $gte: ?0 } }")
    List<State> findByState_TimestampAfter(LocalDateTime from);

    @Query("{ 'timestamp': { $gte: ?0, $lte: ?1 } }")
    List<State> findByState_TimestampBetween(LocalDateTime from, LocalDateTime to);
}
