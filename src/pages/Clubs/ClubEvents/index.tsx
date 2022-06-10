import FullCalendar from "@fullcalendar/react"; // => request placed at the top
//
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
import { Button, Card, Container } from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Iconify from "components/Iconify";
import Page from "components/Page";
import useResponsive from "hooks/useResponsive";
import useSettings from "hooks/useSettings";
import { FC, useEffect, useRef, useState } from "react";
import { ClubData } from "../data.t";
import {
  CalendarStyle,
  CalendarToolbar,
  EventFormModal
} from "../sections/event";


// ----------------------------------------------------------------------
interface ClubEventsProps {
  club: ClubData;
}
const ClubEvents: FC<ClubEventsProps> = ({ club }) => {
  const {isAdmin,isSubAdmin} = club;
  const { themeStretch } = useSettings();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<any>({});

  const isDesktop = useResponsive("up", "sm");

  const calendarRef = useRef(null);

  const [date, setDate] = useState(new Date());

  const [view, setView] = useState(isDesktop ? "dayGridMonth" : "listWeek");

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isDesktop ? "dayGridMonth" : "listWeek";
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isDesktop]);

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    setSelectedRange({ start: arg.start.getTime(), end: arg.end.getTime() });
    setIsFormOpen(true)
  };

  const handleSelectEvent = (arg) => {
    console.log(arg);
  };

  const handleAddEvent = () => {
    if(isAdmin || isSubAdmin)
    setIsFormOpen(true);
  };

  return (
    <Page title="Calendar">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <HeaderBreadcrumbs
          heading="Event"
          action={
           ( isAdmin||isSubAdmin) &&        <Button
              variant="contained"
              startIcon={
                <Iconify icon={"eva:plus-fill"} width={20} height={20} />
              }
              onClick={handleAddEvent}
            >
              New Event
            </Button>
          }
        />

        <Card>
          <CalendarStyle>
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
            />
            <FullCalendar
              weekends
              editable
              droppable
              selectable
              events={[]}
              ref={calendarRef}
              rerenderDelay={10}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              allDayMaintainDuration
              eventResizableFromStart
              select={handleSelectRange}
              eventClick={handleSelectEvent}
              height={isDesktop ? 720 : "auto"}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
            />
          </CalendarStyle>
        </Card>
        <EventFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          range={selectedRange}
        />
      </Container>
    </Page>
  );
};
export default ClubEvents;
