package team.capstonelongstone.freetraveler.post;

import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.board.BoardRepository;
import team.capstonelongstone.freetraveler.post.day.Day;
import team.capstonelongstone.freetraveler.post.day.DayRepository;
import team.capstonelongstone.freetraveler.post.place.Place;
import team.capstonelongstone.freetraveler.post.place.PlaceRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    DayRepository dayRepository;

    /**
     * 도로명 주소로 위도 경도 뽑는 API
     */
    public List<Double> getLatLng(String loc) throws IOException, JSONException {
        String location = loc;

        String addr = "https://dapi.kakao.com/v2/local/search/address.json";

        String apiKey = "KakaoAK fce8df7c13d94d016c5b4bd3abe665ac";

        location = URLEncoder.encode(location, "UTF-8");

        String query = "query=" + location;

        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append(addr);
        stringBuffer.append("?");
        stringBuffer.append(query);

        System.out.println("stringBuffer.toString() "+ stringBuffer.toString());
        URL url = new URL(stringBuffer.toString());

        URLConnection conn = url.openConnection();

        conn.setRequestProperty("Authorization", apiKey);

        BufferedReader rd = null;

        rd = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"));
        StringBuffer docJson = new StringBuffer();

        String line;

        while((line=rd.readLine())!=null){
            docJson.append(line);
        }

        if(0<docJson.toString().length()){
            System.out.println("docJson    :"+docJson.toString());

        }

        rd.close();

        JSONObject jsonObject = new JSONObject(docJson.toString());

        JSONArray jsonArray= (JSONArray) jsonObject.get("documents");

        JSONObject tempObj = (JSONObject) jsonArray.get(0);

        System.out.println("latitude : " + tempObj.getDouble("y"));
        System.out.println("longitude : " + tempObj.getDouble("x"));

        List<Double> LntLng=new ArrayList<>();
        LntLng.add(tempObj.getDouble("y"));
        LntLng.add(tempObj.getDouble("x"));
        return LntLng;
    }

    /**
     * 게시물 JSON으로 가져오기
     */
    public String getPost(String boardId) throws JSONException, IOException {
        long id = Integer.valueOf(boardId).longValue();

        Board board = boardRepository.getById(id);

        JSONObject jsonObject = new JSONObject();

        jsonObject.put("id",board.getId());
        jsonObject.put("author",board.getAuthor().getUserId());
        jsonObject.put("time",board.getModifiedDate());
        jsonObject.put("repimg",board.getRepImgName());
        jsonObject.put("postName",board.getPostName());
        jsonObject.put("totalCost",board.getTotalCost());
        jsonObject.put("totalDays",board.getTotalDays());
        jsonObject.put("totalTrans",board.getTotalTrans());
        jsonObject.put("comment",board.getComment());
        jsonObject.put("good",board.getGoodCnt());

        //day
        List<Day> allByBoardId = dayRepository.findAllByBoard(board);
        JSONArray dayArray= new JSONArray();

        for (Day days : allByBoardId) {
            JSONArray placeArray=new JSONArray();
            List<Place> allByDayId = placeRepository.findAllByDay(days);

            for (Place place : allByDayId) {
                JSONObject data=new JSONObject();

                data.put("placeName",place.getName());
                data.put("loc",place.getAddress());
                data.put("loc_x",place.getLng());
                data.put("loc_y",place.getLat());
                data.put("cost",place.getCost());
                data.put("img",place.getPlaceImgName());
                data.put("content",place.getReview());
                data.put("trans",place.getTransportation());
                placeArray.put(data);
            }
            dayArray.put(placeArray);
            jsonObject.put("days",dayArray);
        }

        return jsonObject.toString();
    }

    /**
     * 게시물 삭제
     */
    public void deletePost(String boardId){
        Integer intBoardId = Integer.valueOf(boardId);
        long longBoardId = intBoardId.longValue();
        Board findByBoardId = boardRepository.findByBoardId(longBoardId);
        boardRepository.delete(findByBoardId);
    }

}
