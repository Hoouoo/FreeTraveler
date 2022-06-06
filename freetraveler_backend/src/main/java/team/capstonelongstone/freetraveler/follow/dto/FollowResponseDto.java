package team.capstonelongstone.freetraveler.follow.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

/**
 * 일단 보류
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FollowResponseDto {

    String id;
    String name;
    @JsonProperty(value = "isCross")
    boolean isCross; // 맞팔로우 여부
}
