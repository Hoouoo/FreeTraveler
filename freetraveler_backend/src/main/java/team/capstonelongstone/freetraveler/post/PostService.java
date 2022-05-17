package team.capstonelongstone.freetraveler.post;

import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    public List<Double> getLatLng(String loc) throws IOException, JSONException {
        String location = loc; //도로명 주소

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

}
