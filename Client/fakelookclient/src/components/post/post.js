import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Icon,
  Image,
} from "semantic-ui-react";
import env from "../../enviroments/enviroment";
import logo from "../../logo/logo_transparent.png";

const Post = ({ post }) => {
    
  const { publisher, text, photoURL } = post;
  return (
    <Card>
      <Image src={photoURL || logo} />
      <CardContent>
        <CardHeader>{publisher}</CardHeader>
        <CardDescription>{text}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button>
          <i class="fas fa-thumbs-up" style={{ color: env.mainColorDark }}></i>
        </Button>
        
      </CardContent>
    </Card>
  );
};

export default Post;
