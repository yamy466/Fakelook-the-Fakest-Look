export default class Post {
  id: number;
  userId: number;
  pictureId: number;
  latitude: number;
  longitude: number;
  text: string;
  likesId: number[];
  postedTime: Date;
  tags: string[];
  taggedUsersId: number[];
  constructor(
    id: number,
    userId: number,
    pictureId: number,
    latitude: number,
    longitude: number,
    text = "",
    likesId: number[],
    postedTime = new Date(),
    tags: string[],
    taggedUsersId: number[]
  ) {
    this.id = id;
    this.userId = userId;
    this.pictureId = pictureId;
    this.latitude = latitude;
    this.longitude = longitude;
    this.text = text;
    this.likesId = likesId;
    this.postedTime = postedTime;
    this.tags = tags;
    this.taggedUsersId = taggedUsersId;
  }
}
