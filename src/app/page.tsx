import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";

type StreamDataResponse = {
  response: string;
  data: {
    streamId: number;
    streamDate: string;
    streamerId: string;
    streamName: string;
    eventId?: string;
    twitchSegmentId?: string;
    duration?: number;
    categoryId?: null;
  }[];
};

async function StreamData() {
  const data = await fetch(
    "https://crud-stage.eribyte.net/getStreams/3/" + Date.now(),
  );

  const streamData: StreamDataResponse = await data.json();

  return (
    <>
      {streamData.data.map((data) => (
        <TableRow>
          <TableCell>{data.streamId}</TableCell>
          <TableCell>{data.streamName}</TableCell>

          <TableCell>
            {format(data.streamDate, "MM/dd/yyyy HH:mm", { locale: enUS })}
          </TableCell>

          <TableCell>{data.duration}</TableCell>

          <TableCell>{data.eventId ? "Y" : "N"}</TableCell>
          <TableCell>{data.twitchSegmentId ? "Y" : "N"}</TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Stream Name</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Discord Event</TableHead>
            <TableHead>Twitch Event</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <StreamData />
        </TableBody>
      </Table>
      <Button>Add Stream</Button>
    </>
  );
}
