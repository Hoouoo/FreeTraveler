package team.capstonelongstone.freetraveler.follow.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FollowRequestDto {

    String id;
    @JsonProperty(value = "isFollow")
    boolean isFollow;



}
