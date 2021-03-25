import { ListContent, ListHeader, ListItem } from "semantic-ui-react"

const Comment = (props) => {
    const {writer,content} = props;
    return (
        <ListItem>
            <ListHeader>{writer}</ListHeader>
            <ListContent>{content}</ListContent>
        </ListItem>
    )
}

export default Comment