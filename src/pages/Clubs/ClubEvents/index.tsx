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
import { useEventsQuery } from "generated/graphql";
import useLocales from "hooks/useLocales";
import useResponsive from "hooks/useResponsive";
import useSettings from "hooks/useSettings";
import { FC, useEffect, useRef, useState } from "react";
import { fFullTime } from "utils/formatTime";
import { ClubData, ClubEvent } from "../data.t";
import {
  CalendarStyle,
  CalendarToolbar,
  EventDetailsModal,
  EventFormModal,
} from "../sections/event";
// ----------------------------------------------------------------------
interface ClubEventsProps {
  club: ClubData;
}
const formatEvent = (event: ClubEvent) => {
  return {
    allDay: false,
    description: event.description,
    id: event.id,
    start: event.time,
    textColor: event.color,
    title: event.title,
  };
};
const ClubEvents: FC<ClubEventsProps> = ({ club }) => {
  const { isAdmin, isSubAdmin } = club;
  const { themeStretch } = useSettings();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<any>({});
  const [currentRange, setCurrentRange] = useState<[string, string]>();
  const isDesktop = useResponsive("up", "sm");
  const { translate } = useLocales();
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const [selectedEvent, setSelectedEvent] = useState<string>(null);

  const calendarRef = useRef(null);

  const [date, setDate] = useState(new Date());

  const [view, setView] = useState(isDesktop ? "dayGridMonth" : "listWeek");

  const { data, refetch } = useEventsQuery({
    variables: {
      clubId: club.id,
      dateAfter: currentRange?.length > 0 && currentRange[0],
      dateBefore: currentRange?.length > 0 && currentRange[1],
      limit: 100,
      offset: 0,
    },
    skip: !currentRange,
  });

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
    if (isAdmin || isSubAdmin) {
      const calendarEl = calendarRef.current;
      if (calendarEl) {
        const calendarApi = calendarEl.getApi();
        calendarApi.unselect();
      }
      setSelectedRange({ start: arg.start.getTime(), end: arg.end.getTime() });
      setIsFormOpen(true);
    }
  };

  const handleSelectEvent = (arg) => {
    setSelectedEvent(arg.event.id);
    setIsDetailsOpen(true);
  };

  const handleAddEvent = () => {
    if (isAdmin || isSubAdmin) setIsFormOpen(true);
  };

  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <HeaderBreadcrumbs
        heading={translate("club.details.events.title")}
        action={
          (isAdmin || isSubAdmin) && (
            <Button
              variant="contained"
              startIcon={
                <Iconify icon={"eva:plus-fill"} width={20} height={20} />
              }
              onClick={handleAddEvent}
            >
              {translate("club.details.events.btn.new_event")}
            </Button>
          )
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
            events={
              data?.getEvents?.results?.map((event: any) =>
                formatEvent(event)
              ) || []
            }
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
            datesSet={(arg) => {
              setCurrentRange([fFullTime(arg.start), fFullTime(arg.end)]);
            }}
            weekNumberCalculation="ISO"
          />
        </CalendarStyle>
      </Card>
      <EventFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        range={selectedRange}
        club={club}
        onPostSave={() => {
          refetch();
        }}
      />
      <EventDetailsModal
        open={isDetailsOpen}
        eventId={selectedEvent}
        onClose={() => {
          setSelectedEvent(null);
          setIsDetailsOpen(false);
        }}
        onRefreshList={() => {
          refetch();
        }}
      />
    </Container>
  );
};
export default ClubEvents;
