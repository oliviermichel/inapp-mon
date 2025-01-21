import { CardContent, Typography } from "@mui/material";

const CollectionMessage: React.FC<{ item: string }> = ({ item }) => (
    <CardContent>
        <Typography variant="h5" component="div">
            {item}
        </Typography>
    </CardContent>
);

export default CollectionMessage;