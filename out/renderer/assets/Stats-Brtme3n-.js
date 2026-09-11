import { _ as _sfc_main$6 } from "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import { _ as _sfc_main$5 } from "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import { _ as __unplugin_components_5 } from "./SLoading-C4RltnK4.js";
import { u as useI18n, aA as useLibraryStore, ak as navigateToAlbum, a9 as navigateToArtist, af as playNow, a_ as isLosslessCodec, c as useRouter } from "./index-DVKNk9gd.js";
import { a as formatCompact } from "./format-DoPtjAAN.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { I as IconLucideDisc3 } from "./disc-3-B-fZRQOF.js";
import { I as IconLucideUser } from "./user-C_ofWqo5.js";
import { x as defineComponent, y as createElementBlock, F as Fragment, N as renderList, v as unref, c as computed, P as createBlock, Q as withCtx, D as createVNode, z as createBaseVNode, M as normalizeClass, O as toDisplayString, B as createCommentVNode, R as resolveDynamicComponent, C as openBlock, _ as renderSlot, A as normalizeStyle, k as onMounted, r as ref, q as shallowRef } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { _ as _sfc_main$7 } from "./STooltip.vue_vue_type_script_setup_true_lang-D_YXqbDl.js";
import { I as IconLucideClock } from "./clock-DwYr81zG.js";
import { I as IconLucideHardDrive } from "./hard-drive-nkZY3ydd.js";
import { u as useFloatingPlayerBar } from "./useFloatingPlayerBar-R2fVODYZ.js";
import "./song-BGJnBQIx.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./PopperContent-CPX94GL7.js";
const _hoisted_1$4 = { class: "grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3" };
const _hoisted_2$3 = { class: "flex items-center gap-3" };
const _hoisted_3$3 = { class: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary" };
const _hoisted_4$3 = { class: "min-w-0 flex-1" };
const _hoisted_5$2 = { class: "truncate text-base font-semibold text-on-surface" };
const _hoisted_6$2 = { class: "text-xs font-semibold text-on-surface-variant/45" };
const _hoisted_7$2 = {
  key: 0,
  class: "flex min-h-56 items-center justify-center"
};
const _hoisted_8$2 = { key: 1 };
const _hoisted_9$1 = ["onClick"];
const _hoisted_10$1 = { class: "shrink-0" };
const _hoisted_11$1 = { class: "relative h-20 min-w-0" };
const _hoisted_12$1 = { class: "flex h-full min-w-0 flex-col justify-between py-1.5" };
const _hoisted_13$1 = { class: "min-w-0 pr-12" };
const _hoisted_14$1 = { class: "truncate text-base font-semibold leading-tight text-on-surface" };
const _hoisted_15$1 = {
  key: 0,
  class: "mt-1 truncate text-xs leading-none text-on-surface-variant/60"
};
const _hoisted_16$1 = { class: "flex items-baseline gap-1 tabular-nums" };
const _hoisted_17$1 = { class: "text-3xl font-bold leading-none text-on-surface" };
const _hoisted_18$1 = { class: "text-[11px] font-medium text-on-surface-variant/55" };
const _hoisted_19$1 = { class: "mt-2 flex flex-col" };
const _hoisted_20$1 = ["onClick"];
const _hoisted_21$1 = { class: "text-center text-xs font-bold text-on-surface-variant/45 tabular-nums transition-colors duration-200 group-hover:text-primary" };
const _hoisted_22$1 = { class: "min-w-0" };
const _hoisted_23$1 = { class: "truncate text-sm font-medium text-on-surface" };
const _hoisted_24$1 = {
  key: 0,
  class: "mt-0.5 truncate text-xs text-on-surface-variant/50"
};
const _hoisted_25$1 = { class: "ml-2 shrink-0 text-right tabular-nums" };
const _hoisted_26$1 = { class: "text-xl font-bold leading-none text-on-surface" };
const _hoisted_27$1 = { class: "text-[10px] text-on-surface-variant/45" };
const _hoisted_28$1 = {
  key: 2,
  class: "flex min-h-56 flex-col items-center justify-center gap-2 rounded-2xl bg-on-surface/3 text-on-surface-variant/40"
};
const _hoisted_29$1 = { class: "text-sm" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "StatsTopList",
  props: {
    songs: {},
    albums: {},
    artists: {},
    loading: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { t, locale } = useI18n();
    const libraryStore = useLibraryStore();
    const songItems = computed(
      () => props.songs.map((item) => ({
        cover: item.track.cover,
        title: item.track.title,
        subtitle: item.track.artists.map((artist) => artist.name).join(" / "),
        plays: item.playCount,
        track: item.track
      }))
    );
    const albumItems = computed(
      () => props.albums.map((item) => ({
        cover: item.track.album?.cover ?? item.track.cover,
        title: item.track.album?.name ?? "",
        subtitle: item.track.artists.map((artist) => artist.name).join(" / "),
        plays: item.playCount,
        track: item.track
      }))
    );
    const artistItems = computed(
      () => props.artists.map((item) => ({
        cover: item.track.source === "local" ? libraryStore.getArtistAvatar(item.artist.name) ?? item.artist.avatar ?? item.track.cover : item.artist.avatar ?? item.track.cover,
        title: item.artist.name,
        plays: item.playCount,
        track: item.track,
        artistId: item.artist.id
      }))
    );
    const sections = computed(() => [
      {
        id: "songs",
        title: t("stats.topSongs"),
        icon: __unplugin_components_4,
        circle: false,
        items: songItems.value,
        onClick: (item) => playSong(item.track)
      },
      {
        id: "albums",
        title: t("stats.topAlbums"),
        icon: IconLucideDisc3,
        circle: false,
        items: albumItems.value,
        onClick: (item) => navigateToAlbum(item.title, {
          source: item.track.source,
          albumId: item.track.album?.id
        })
      },
      {
        id: "artists",
        title: t("stats.topArtists"),
        icon: IconLucideUser,
        circle: true,
        items: artistItems.value,
        onClick: (item) => navigateToArtist(item.title, {
          source: item.track.source,
          artistId: item.artistId
        })
      }
    ]);
    const playCountText = (plays) => formatCompact(plays, locale.value);
    const playSong = (track) => {
      void playNow(track);
    };
    return (_ctx, _cache) => {
      const _component_SLoading = __unplugin_components_5;
      const _component_SImg = _sfc_main$5;
      const _component_SCard = _sfc_main$6;
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(sections), (section) => {
          return openBlock(), createBlock(_component_SCard, {
            key: section.id,
            radius: "xl",
            size: "small",
            class: "overflow-hidden [&>div:first-child]:py-3 [&>div:last-child]:pb-3"
          }, {
            header: withCtx(() => [
              createBaseVNode("div", _hoisted_2$3, [
                createBaseVNode("div", _hoisted_3$3, [
                  (openBlock(), createBlock(resolveDynamicComponent(section.icon), { class: "size-5" }))
                ]),
                createBaseVNode("div", _hoisted_4$3, [
                  createBaseVNode("h3", _hoisted_5$2, toDisplayString(section.title), 1),
                  createBaseVNode("p", _hoisted_6$2, " TOP " + toDisplayString(__props.loading ? "--" : section.items.length), 1)
                ])
              ])
            ]),
            default: withCtx(() => [
              __props.loading ? (openBlock(), createElementBlock("div", _hoisted_7$2, [
                createVNode(_component_SLoading, { class: "size-6 text-primary/60" })
              ])) : section.items.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_8$2, [
                createBaseVNode("div", {
                  class: "grid w-full cursor-pointer grid-cols-[5rem_minmax(0,1fr)] items-center gap-3 rounded-2xl bg-primary/8 p-3 text-left transition-colors duration-200 hover:bg-primary/11",
                  onClick: ($event) => section.onClick(section.items[0])
                }, [
                  createBaseVNode("div", _hoisted_10$1, [
                    createVNode(_component_SImg, {
                      src: section.items[0].cover,
                      alt: section.items[0].title,
                      class: normalizeClass(["size-20 ring-1 ring-inset ring-black/10 dark:ring-white/10", section.circle ? "rounded-full" : "rounded-xl"])
                    }, null, 8, ["src", "alt", "class"])
                  ]),
                  createBaseVNode("div", _hoisted_11$1, [
                    createBaseVNode("div", _hoisted_12$1, [
                      createBaseVNode("div", _hoisted_13$1, [
                        createBaseVNode("div", _hoisted_14$1, toDisplayString(section.items[0].title), 1),
                        section.items[0].subtitle ? (openBlock(), createElementBlock("div", _hoisted_15$1, toDisplayString(section.items[0].subtitle), 1)) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", _hoisted_16$1, [
                        createBaseVNode("span", _hoisted_17$1, toDisplayString(playCountText(section.items[0].plays)), 1),
                        createBaseVNode("span", _hoisted_18$1, toDisplayString(unref(t)("stats.playsUnit")), 1)
                      ])
                    ]),
                    _cache[0] || (_cache[0] = createBaseVNode("span", { class: "absolute right-0 top-1 text-xs font-bold tracking-wider text-primary" }, " TOP 1 ", -1))
                  ])
                ], 8, _hoisted_9$1),
                createBaseVNode("div", _hoisted_19$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(section.items.slice(1), (item, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: `${item.title}-${index}`,
                      class: "group grid min-h-14 w-full cursor-pointer grid-cols-[1.25rem_2.75rem_minmax(0,1fr)_auto] items-center gap-2 rounded-xl p-1.5 text-left transition-colors duration-200 hover:bg-on-surface/6",
                      onClick: ($event) => section.onClick(item)
                    }, [
                      createBaseVNode("span", _hoisted_21$1, toDisplayString(String(index + 2).padStart(2, "0")), 1),
                      createVNode(_component_SImg, {
                        src: item.cover,
                        alt: item.title,
                        class: normalizeClass(["size-11 ring-1 ring-inset ring-black/10 dark:ring-white/10", section.circle ? "rounded-full" : "rounded-lg"])
                      }, null, 8, ["src", "alt", "class"]),
                      createBaseVNode("div", _hoisted_22$1, [
                        createBaseVNode("div", _hoisted_23$1, toDisplayString(item.title), 1),
                        item.subtitle ? (openBlock(), createElementBlock("div", _hoisted_24$1, toDisplayString(item.subtitle), 1)) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", _hoisted_25$1, [
                        createBaseVNode("div", _hoisted_26$1, toDisplayString(playCountText(item.plays)), 1),
                        createBaseVNode("div", _hoisted_27$1, toDisplayString(unref(t)("stats.playsUnit")), 1)
                      ])
                    ], 8, _hoisted_20$1);
                  }), 128))
                ])
              ])) : (openBlock(), createElementBlock("div", _hoisted_28$1, [
                (openBlock(), createBlock(resolveDynamicComponent(section.icon), { class: "size-7" })),
                createBaseVNode("span", _hoisted_29$1, toDisplayString(unref(t)("stats.noData")), 1)
              ]))
            ]),
            _: 2
          }, 1024);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1$3 = { class: "relative size-32 shrink-0" };
const _hoisted_2$2 = {
  class: "size-full -rotate-90",
  viewBox: "0 0 128 128",
  "aria-hidden": "true"
};
const _hoisted_3$2 = ["d", "opacity"];
const _hoisted_4$2 = { class: "absolute inset-0 flex flex-col items-center justify-center text-center" };
const RING_RADIUS = 46;
const RING_WIDTH = 16;
const RING_GAP = 2;
const RING_MIN_SEGMENT_PERCENT = 2.5;
const RING_CORNER_RADIUS = 2.5;
const RING_CENTER = 64;
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "StatsDonutChart",
  props: {
    segments: {}
  },
  setup(__props) {
    const props = __props;
    const ringPoint = (radius, angle) => ({
      x: RING_CENTER + radius * Math.cos(angle),
      y: RING_CENTER + radius * Math.sin(angle)
    });
    const roundedSegmentPath = (offsetPercent, segmentPercent) => {
      const outerRadius = RING_RADIUS + RING_WIDTH / 2;
      const innerRadius = RING_RADIUS - RING_WIDTH / 2;
      const gapAngle = RING_GAP / RING_RADIUS;
      const startAngle = offsetPercent / 100 * Math.PI * 2 + gapAngle / 2;
      const endAngle = (offsetPercent + segmentPercent) / 100 * Math.PI * 2 - gapAngle / 2;
      const segmentAngle = endAngle - startAngle;
      const cornerRadius = Math.min(
        RING_CORNER_RADIUS,
        segmentAngle * innerRadius * 0.45,
        RING_WIDTH / 2
      );
      const outerCornerAngle = cornerRadius / outerRadius;
      const innerCornerAngle = cornerRadius / innerRadius;
      const outerStart = ringPoint(outerRadius, startAngle + outerCornerAngle);
      const outerEnd = ringPoint(outerRadius, endAngle - outerCornerAngle);
      const outerEndCorner = ringPoint(outerRadius, endAngle);
      const outerEndEdge = ringPoint(outerRadius - cornerRadius, endAngle);
      const innerEndEdge = ringPoint(innerRadius + cornerRadius, endAngle);
      const innerEndCorner = ringPoint(innerRadius, endAngle);
      const innerEnd = ringPoint(innerRadius, endAngle - innerCornerAngle);
      const innerStart = ringPoint(innerRadius, startAngle + innerCornerAngle);
      const innerStartCorner = ringPoint(innerRadius, startAngle);
      const innerStartEdge = ringPoint(innerRadius + cornerRadius, startAngle);
      const outerStartEdge = ringPoint(outerRadius - cornerRadius, startAngle);
      const outerStartCorner = ringPoint(outerRadius, startAngle);
      const outerLargeArc = segmentAngle - outerCornerAngle * 2 > Math.PI ? 1 : 0;
      const innerLargeArc = segmentAngle - innerCornerAngle * 2 > Math.PI ? 1 : 0;
      return [
        `M ${outerStart.x} ${outerStart.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${outerLargeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
        `Q ${outerEndCorner.x} ${outerEndCorner.y} ${outerEndEdge.x} ${outerEndEdge.y}`,
        `L ${innerEndEdge.x} ${innerEndEdge.y}`,
        `Q ${innerEndCorner.x} ${innerEndCorner.y} ${innerEnd.x} ${innerEnd.y}`,
        `A ${innerRadius} ${innerRadius} 0 ${innerLargeArc} 0 ${innerStart.x} ${innerStart.y}`,
        `Q ${innerStartCorner.x} ${innerStartCorner.y} ${innerStartEdge.x} ${innerStartEdge.y}`,
        `L ${outerStartEdge.x} ${outerStartEdge.y}`,
        `Q ${outerStartCorner.x} ${outerStartCorner.y} ${outerStart.x} ${outerStart.y}`,
        "Z"
      ].join(" ");
    };
    const visuals = computed(() => {
      const smallSegmentCount = props.segments.filter(
        (segment) => segment.percent < RING_MIN_SEGMENT_PERCENT
      ).length;
      const flexibleTotal = props.segments.reduce(
        (sum, segment) => segment.percent >= RING_MIN_SEGMENT_PERCENT ? sum + segment.percent : sum,
        0
      );
      const flexibleScale = flexibleTotal ? (100 - smallSegmentCount * RING_MIN_SEGMENT_PERCENT) / flexibleTotal : 1;
      let offset = 0;
      return props.segments.map((segment) => {
        const visualPercent = segment.percent < RING_MIN_SEGMENT_PERCENT ? RING_MIN_SEGMENT_PERCENT : segment.percent * flexibleScale;
        const visual = {
          ...segment,
          path: roundedSegmentPath(offset, visualPercent)
        };
        offset += visualPercent;
        return visual;
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        (openBlock(), createElementBlock("svg", _hoisted_2$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(visuals), (segment) => {
            return openBlock(), createElementBlock("path", {
              key: segment.id,
              d: segment.path,
              fill: "rgb(var(--s-primary))",
              opacity: segment.opacity
            }, null, 8, _hoisted_3$2);
          }), 128))
        ])),
        createBaseVNode("div", _hoisted_4$2, [
          renderSlot(_ctx.$slots, "default")
        ])
      ]);
    };
  }
});
const _hoisted_1$2 = { class: "grid grid-cols-[300px_minmax(0,1fr)] gap-5 xl:grid-cols-[300px_minmax(0,1fr)_400px]" };
const _hoisted_2$1 = { class: "flex items-baseline justify-between gap-3" };
const _hoisted_3$1 = { class: "text-base font-semibold text-on-surface" };
const _hoisted_4$1 = { class: "text-xs text-on-surface-variant/45" };
const _hoisted_5$1 = { class: "mx-auto flex min-h-0 w-fit flex-1 items-center gap-2" };
const _hoisted_6$1 = { class: "grid shrink-0 grid-rows-[1.25rem_repeat(7,13px)] gap-y-0.5" };
const _hoisted_7$1 = { class: "flex items-center justify-center gap-2 text-xs text-on-surface-variant/50" };
const _hoisted_8$1 = { class: "flex items-baseline justify-between gap-3" };
const _hoisted_9 = { class: "text-base font-semibold text-on-surface" };
const _hoisted_10 = { class: "relative min-h-0 flex-1" };
const _hoisted_11 = {
  class: "absolute inset-0 size-full",
  viewBox: "0 0 240 128",
  preserveAspectRatio: "none"
};
const _hoisted_12 = ["d"];
const _hoisted_13 = ["d"];
const _hoisted_14 = { class: "block whitespace-nowrap text-[9px] font-medium leading-none text-on-primary/80" };
const _hoisted_15 = { class: "mt-1 block whitespace-nowrap text-xs font-bold leading-none" };
const _hoisted_16 = {
  key: 2,
  class: "absolute inset-0 flex items-center justify-center text-sm text-on-surface-variant/40"
};
const _hoisted_17 = {
  key: 0,
  class: "text-center text-xs text-on-surface-variant/55"
};
const _hoisted_18 = { class: "flex items-baseline justify-between gap-3" };
const _hoisted_19 = { class: "text-base font-semibold text-on-surface" };
const _hoisted_20 = { class: "text-xs text-on-surface-variant/45 tabular-nums" };
const _hoisted_21 = {
  key: 0,
  class: "mx-auto flex min-h-0 w-full max-w-[520px] flex-1 items-center gap-4"
};
const _hoisted_22 = { class: "text-[10px] text-on-surface-variant/55" };
const _hoisted_23 = { class: "mt-1 text-xl font-bold leading-none text-on-surface tabular-nums" };
const _hoisted_24 = { class: "grid min-w-0 flex-1 grid-cols-2 gap-x-3 gap-y-3" };
const _hoisted_25 = { class: "min-w-0" };
const _hoisted_26 = { class: "truncate text-xs font-medium text-on-surface" };
const _hoisted_27 = { class: "truncate text-[10px] text-on-surface-variant/50 tabular-nums" };
const _hoisted_28 = {
  key: 1,
  class: "flex min-h-0 flex-1 items-center justify-center"
};
const _hoisted_29 = {
  key: 2,
  class: "flex min-h-0 flex-1 flex-col items-center justify-center gap-2 text-on-surface-variant/40"
};
const _hoisted_30 = { class: "text-sm" };
const HEATMAP_DAYS = 90;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StatsHeatmap",
  props: {
    daily: {},
    hourly: {},
    stats: {},
    loading: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { t, locale } = useI18n();
    const pad2 = (value) => String(value).padStart(2, "0");
    const dayKey = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
    const heatWeeks = computed(() => {
      const map = new Map(props.daily.map((item) => [item.day, item.playCount]));
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const start = new Date(today);
      start.setDate(start.getDate() - (HEATMAP_DAYS - 1));
      const lead = start.getDay();
      const weeks = [];
      let week = [];
      const total = lead + HEATMAP_DAYS;
      for (let i = 0; i < total; i++) {
        if (i < lead) {
          week.push(null);
        } else {
          const date = new Date(start);
          date.setDate(start.getDate() + (i - lead));
          const key = dayKey(date);
          week.push({ day: key, playCount: map.get(key) ?? 0, date });
        }
        if (week.length === 7 || i === total - 1) {
          weeks.push(week);
          week = [];
        }
      }
      return weeks;
    });
    const maxDayPlays = computed(() => Math.max(0, ...props.daily.map((item) => item.playCount)));
    const cellStyle = (playCount) => {
      if (playCount === 0) return { backgroundColor: "rgb(var(--s-primary) / 0.06)" };
      const ratio = playCount / maxDayPlays.value;
      const alpha = 0.14 + ratio * 0.72;
      return { backgroundColor: `rgb(var(--s-primary) / ${alpha})` };
    };
    const weekMonthLabels = computed(() => {
      const fmt = new Intl.DateTimeFormat(locale.value, { month: "short" });
      let previous = null;
      return heatWeeks.value.map((week) => {
        const cell = week.find((item) => item !== null);
        const label = cell ? fmt.format(cell.date) : null;
        const show = label && label !== previous ? label : null;
        if (label) previous = label;
        return show;
      });
    });
    const rowLabels = computed(() => {
      const sunday = new Date(2024, 0, 7);
      const fmt = new Intl.DateTimeFormat(locale.value, { weekday: "short" });
      return Array.from({ length: 7 }, (_, dow) => {
        const date = new Date(sunday);
        date.setDate(sunday.getDate() + dow);
        return fmt.format(date);
      });
    });
    const dayTooltip = (cell) => `${cell?.day ?? ""} · ${t("stats.plays", { count: cell?.playCount ?? 0 }, cell?.playCount ?? 0)}`;
    const cellPlayCount = (week, dow) => week[dow - 1]?.playCount ?? 0;
    const hourlyMax = computed(() => Math.max(0, ...props.hourly.map((item) => item.playCount)));
    const hourlyTotal = computed(() => props.hourly.reduce((sum, item) => sum + item.playCount, 0));
    const peakHour = computed(
      () => props.hourly.reduce(
        (peak, item) => !peak || item.playCount > peak.playCount ? item : peak,
        null
      )
    );
    const hourlyPoints = computed(
      () => Array.from({ length: 24 }, (_, hour) => {
        const count = props.hourly.find((item) => item.hour === hour)?.playCount ?? 0;
        const ratio = hourlyMax.value ? count / hourlyMax.value : 0;
        return {
          x: hour / 23 * 240,
          y: 120 - ratio * 104
        };
      })
    );
    const peakPoint = computed(() => peakHour.value ? hourlyPoints.value[peakHour.value.hour] : null);
    const peakLabelX = computed(() => Math.min(212, Math.max(28, peakPoint.value?.x ?? 0)));
    const peakLabelY = computed(() => Math.max(20, (peakPoint.value?.y ?? 0) - 20));
    const hourlyLinePath = computed(() => {
      const points = hourlyPoints.value;
      if (points.length === 0) return "";
      let path = `M ${points[0].x} ${points[0].y}`;
      for (let index = 0; index < points.length - 1; index++) {
        const p0 = points[Math.max(0, index - 1)];
        const p1 = points[index];
        const p2 = points[index + 1];
        const p3 = points[Math.min(points.length - 1, index + 2)];
        const control1Y = Math.min(120, Math.max(8, p1.y + (p2.y - p0.y) / 6));
        const control2Y = Math.min(120, Math.max(8, p2.y - (p3.y - p1.y) / 6));
        path += ` C ${p1.x + (p2.x - p0.x) / 6} ${control1Y}, ${p2.x - (p3.x - p1.x) / 6} ${control2Y}, ${p2.x} ${p2.y}`;
      }
      return path;
    });
    const hourlyAreaPath = computed(() => `${hourlyLinePath.value} L 240 124 L 0 124 Z`);
    const codecs = computed(() => (props.stats?.codecs ?? []).filter((item) => item.codec.trim()));
    const chartCodecs = computed(() => codecs.value.slice(0, 4));
    const totalCodecCount = computed(
      () => chartCodecs.value.reduce((sum, item) => sum + item.count, 0)
    );
    const codecVisuals = computed(() => {
      return chartCodecs.value.map((item, index) => ({
        ...item,
        id: item.codec,
        percent: totalCodecCount.value ? item.count / totalCodecCount.value * 100 : 0,
        opacity: Math.max(0.24, 0.92 - index * 0.14)
      }));
    });
    const losslessCount = computed(
      () => chartCodecs.value.reduce((sum, item) => sum + (isLosslessCodec(item.codec) ? item.count : 0), 0)
    );
    const losslessPercent = computed(
      () => totalCodecCount.value ? losslessCount.value / totalCodecCount.value * 100 : 0
    );
    const codecPercent = (count) => {
      if (!totalCodecCount.value) return "0%";
      return `${(count / totalCodecCount.value * 100).toFixed(1)}%`;
    };
    const codecLabel = (codec) => {
      return codec ? codec.toUpperCase() : t("stats.unknown");
    };
    return (_ctx, _cache) => {
      const _component_STooltip = _sfc_main$7;
      const _component_SCard = _sfc_main$6;
      const _component_SLoading = __unplugin_components_5;
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(_component_SCard, {
          radius: "xl",
          class: "flex h-52 min-w-0 flex-col gap-3"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2$1, [
              createBaseVNode("h3", _hoisted_3$1, toDisplayString(unref(t)("stats.listeningActivity")), 1),
              createBaseVNode("span", _hoisted_4$1, toDisplayString(unref(t)("stats.last90Days")), 1)
            ]),
            createBaseVNode("div", _hoisted_5$1, [
              createBaseVNode("div", _hoisted_6$1, [
                _cache[0] || (_cache[0] = createBaseVNode("div", null, null, -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(rowLabels), (label, dow) => {
                  return openBlock(), createElementBlock("div", {
                    key: dow,
                    class: "flex items-center justify-end whitespace-nowrap text-xs leading-none text-on-surface-variant/50"
                  }, toDisplayString([1, 3, 5].includes(dow) ? label : ""), 1);
                }), 128))
              ]),
              createBaseVNode("div", {
                class: "grid shrink-0 gap-0.5",
                style: normalizeStyle({
                  gridTemplateColumns: `repeat(${unref(heatWeeks).length}, 13px)`,
                  gridTemplateRows: "1.25rem repeat(7, 13px)"
                })
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(weekMonthLabels), (label, weekIndex) => {
                  return openBlock(), createElementBlock("div", {
                    key: `m${weekIndex}`,
                    class: "whitespace-nowrap text-center text-xs leading-none text-on-surface-variant/50"
                  }, toDisplayString(label), 1);
                }), 128)),
                (openBlock(), createElementBlock(Fragment, null, renderList(7, (dow) => {
                  return openBlock(), createElementBlock(Fragment, {
                    key: `r${dow}`
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(heatWeeks), (week, weekIndex) => {
                      return openBlock(), createBlock(_component_STooltip, {
                        key: weekIndex,
                        content: dayTooltip(week[dow - 1]),
                        disabled: !week[dow - 1],
                        side: "top",
                        align: "center"
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", {
                            class: normalizeClass(["h-full min-h-0 w-full rounded-[3px]", week[dow - 1] ? "cursor-default" : "opacity-0"]),
                            style: normalizeStyle(cellStyle(cellPlayCount(week, dow)))
                          }, null, 6)
                        ]),
                        _: 2
                      }, 1032, ["content", "disabled"]);
                    }), 128))
                  ], 64);
                }), 64))
              ], 4)
            ]),
            createBaseVNode("div", _hoisted_7$1, [
              createBaseVNode("span", null, toDisplayString(unref(t)("stats.less")), 1),
              (openBlock(), createElementBlock(Fragment, null, renderList(5, (level) => {
                return createBaseVNode("div", {
                  key: level,
                  class: "size-3 rounded-[3px]",
                  style: normalizeStyle(cellStyle(Math.round(level / 5 * unref(maxDayPlays))))
                }, null, 4);
              }), 64)),
              createBaseVNode("span", null, toDisplayString(unref(t)("stats.more")), 1)
            ])
          ]),
          _: 1
        }),
        createVNode(_component_SCard, {
          radius: "xl",
          class: "flex h-52 min-w-0 flex-col gap-2"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_8$1, [
              createBaseVNode("h3", _hoisted_9, toDisplayString(unref(t)("stats.listeningHours")), 1)
            ]),
            createBaseVNode("div", _hoisted_10, [
              (openBlock(), createElementBlock("svg", _hoisted_11, [
                !__props.loading && unref(hourlyTotal) > 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createBaseVNode("path", {
                    d: unref(hourlyAreaPath),
                    fill: "rgb(var(--s-primary) / 0.08)"
                  }, null, 8, _hoisted_12),
                  createBaseVNode("path", {
                    d: unref(hourlyLinePath),
                    fill: "none",
                    stroke: "rgb(var(--s-primary))",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "vector-effect": "non-scaling-stroke"
                  }, null, 8, _hoisted_13)
                ], 64)) : createCommentVNode("", true)
              ])),
              !__props.loading && unref(hourlyTotal) > 0 && unref(peakHour) ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "pointer-events-none absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-surface-panel shadow-sm",
                style: normalizeStyle({
                  left: `${unref(hourlyPoints)[unref(peakHour).hour].x / 240 * 100}%`,
                  top: `${unref(hourlyPoints)[unref(peakHour).hour].y / 128 * 100}%`
                })
              }, null, 4)) : createCommentVNode("", true),
              !__props.loading && unref(hourlyTotal) > 0 && unref(peakHour) ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: "pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-center text-[10px] font-semibold text-on-primary tabular-nums shadow-md",
                style: normalizeStyle({
                  left: `${unref(peakLabelX) / 240 * 100}%`,
                  top: `${unref(peakLabelY) / 128 * 100}%`
                })
              }, [
                createBaseVNode("span", _hoisted_14, toDisplayString(unref(t)("stats.peakListening")), 1),
                createBaseVNode("span", _hoisted_15, toDisplayString(String(unref(peakHour).hour).padStart(2, "0")) + ":00 ", 1)
              ], 4)) : createCommentVNode("", true),
              !__props.loading && unref(hourlyTotal) === 0 ? (openBlock(), createElementBlock("div", _hoisted_16, toDisplayString(unref(t)("stats.noPlayHistory")), 1)) : createCommentVNode("", true)
            ]),
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "flex justify-between text-[10px] text-on-surface-variant/40 tabular-nums" }, [
              createBaseVNode("span", null, "00"),
              createBaseVNode("span", null, "06"),
              createBaseVNode("span", null, "12"),
              createBaseVNode("span", null, "18"),
              createBaseVNode("span", null, "24")
            ], -1)),
            unref(hourlyTotal) > 0 && unref(peakHour) ? (openBlock(), createElementBlock("p", _hoisted_17, toDisplayString(unref(t)("stats.favoriteHour", {
              hour: String(unref(peakHour).hour).padStart(2, "0"),
              count: unref(peakHour).playCount
            })), 1)) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(_component_SCard, {
          radius: "xl",
          class: "col-span-2 flex h-52 min-w-0 flex-col gap-3 xl:col-span-1"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_18, [
              createBaseVNode("h3", _hoisted_19, toDisplayString(unref(t)("stats.audioQuality")), 1),
              createBaseVNode("span", _hoisted_20, toDisplayString(__props.loading ? "--" : unref(t)("stats.formatCount", { count: unref(chartCodecs).length })), 1)
            ]),
            !__props.loading && unref(chartCodecs).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_21, [
              createVNode(_sfc_main$3, { segments: unref(codecVisuals) }, {
                default: withCtx(() => [
                  createBaseVNode("span", _hoisted_22, toDisplayString(unref(t)("stats.losslessRatio")), 1),
                  createBaseVNode("span", _hoisted_23, toDisplayString(unref(losslessPercent).toFixed(1)) + "% ", 1)
                ]),
                _: 1
              }, 8, ["segments"]),
              createBaseVNode("div", _hoisted_24, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(codecVisuals), (codec) => {
                  return openBlock(), createElementBlock("div", {
                    key: codec.codec,
                    class: "grid min-w-0 grid-cols-[0.5rem_minmax(0,1fr)] items-center gap-2"
                  }, [
                    createBaseVNode("span", {
                      class: "size-2 rounded-full bg-primary",
                      style: normalizeStyle({ opacity: codec.opacity })
                    }, null, 4),
                    createBaseVNode("div", _hoisted_25, [
                      createBaseVNode("div", _hoisted_26, toDisplayString(codecLabel(codec.codec)), 1),
                      createBaseVNode("div", _hoisted_27, toDisplayString(codec.count) + " " + toDisplayString(unref(t)("stats.trackUnit")) + " · " + toDisplayString(codecPercent(codec.count)), 1)
                    ])
                  ]);
                }), 128))
              ])
            ])) : __props.loading ? (openBlock(), createElementBlock("div", _hoisted_28, [
              createVNode(_component_SLoading, { class: "size-6 text-primary/60" })
            ])) : (openBlock(), createElementBlock("div", _hoisted_29, [
              createVNode(unref(__unplugin_components_4), { class: "size-7" }),
              createBaseVNode("span", _hoisted_30, toDisplayString(unref(t)("stats.noDataHint")), 1)
            ]))
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5" };
const _hoisted_2 = { class: "relative flex h-full flex-col justify-between" };
const _hoisted_3 = { class: "flex items-baseline gap-0.5" };
const _hoisted_4 = { class: "text-3xl font-bold leading-none text-on-surface tabular-nums" };
const _hoisted_5 = {
  key: 0,
  class: "text-sm font-medium text-on-surface-variant/70"
};
const _hoisted_6 = { class: "text-3xl font-bold leading-none text-on-surface tabular-nums" };
const _hoisted_7 = {
  key: 0,
  class: "text-sm font-medium text-on-surface-variant/70"
};
const _hoisted_8 = { class: "truncate text-xs mt-1 text-on-surface-variant/50" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StatsOverview",
  props: {
    stats: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const router = useRouter();
    const navigateCard = (card) => {
      if (card.to) router.push(card.to);
    };
    const formatDurationParts = (ms) => {
      const totalMin = Math.floor(ms / 6e4);
      return { hours: Math.floor(totalMin / 60), minutes: totalMin % 60 };
    };
    const formatSizeParts = (bytes) => {
      if (bytes < 1024 * 1024 * 1024) return { value: (bytes / (1024 * 1024)).toFixed(1), unit: "MB" };
      return { value: (bytes / (1024 * 1024 * 1024)).toFixed(1), unit: "GB" };
    };
    const overviewCards = computed(() => {
      const stats = props.stats;
      const duration = stats ? formatDurationParts(stats.totalDurationMs) : null;
      const size = stats ? formatSizeParts(stats.totalFileSize) : null;
      return [
        {
          key: "songs",
          icon: __unplugin_components_4,
          value: stats ? String(stats.trackCount) : "--",
          to: "/library"
        },
        {
          key: "albums",
          icon: IconLucideDisc3,
          value: stats ? String(stats.albumCount) : "--",
          to: "/albums/local"
        },
        {
          key: "artists",
          icon: IconLucideUser,
          value: stats ? String(stats.artistCount) : "--",
          to: "/artists/local"
        },
        duration ? {
          key: "totalDuration",
          icon: IconLucideClock,
          value: String(duration.hours),
          unit: "h",
          value2: String(duration.minutes),
          unit2: "m"
        } : { key: "totalDuration", icon: IconLucideClock, value: "--" },
        size ? { key: "totalSize", icon: IconLucideHardDrive, value: size.value, unit: size.unit } : { key: "totalSize", icon: IconLucideHardDrive, value: "--" }
      ];
    });
    return (_ctx, _cache) => {
      const _component_SCard = _sfc_main$6;
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(overviewCards), (card) => {
          return openBlock(), createBlock(_component_SCard, {
            key: card.key,
            radius: "xl",
            hoverable: !!card.to,
            class: "relative overflow-hidden",
            onClick: ($event) => navigateCard(card)
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(card.icon), { class: "pointer-events-none absolute -right-2 -bottom-3 size-18 -rotate-14 text-primary/20" })),
              createBaseVNode("div", _hoisted_2, [
                createBaseVNode("div", _hoisted_3, [
                  createBaseVNode("span", _hoisted_4, toDisplayString(card.value), 1),
                  card.unit ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(card.unit), 1)) : createCommentVNode("", true),
                  card.value2 !== void 0 ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createBaseVNode("span", _hoisted_6, toDisplayString(card.value2), 1),
                    card.unit2 ? (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(card.unit2), 1)) : createCommentVNode("", true)
                  ], 64)) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_8, toDisplayString(unref(t)(`stats.${card.key}`)), 1)
              ])
            ]),
            _: 2
          }, 1032, ["hoverable", "onClick"]);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1 = { class: "h-full overflow-y-auto [scrollbar-gutter:stable]" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "Stats" },
  __name: "Stats",
  setup(__props) {
    const { isFloatingBar } = useFloatingPlayerBar();
    const libraryStats = ref(null);
    const daily = ref([]);
    const hourly = ref([]);
    const topSongs = shallowRef([]);
    const topAlbums = shallowRef([]);
    const topArtists = shallowRef([]);
    const loading = ref(true);
    onMounted(async () => {
      try {
        const [library, history, hourlyHistory, songs, albums, artists] = await Promise.all([
          window.api.stats.getLibraryStats(),
          window.api.stats.getPlayHistoryDaily(90),
          window.api.stats.getPlayHistoryHourly(),
          window.api.stats.getTopTracks(10),
          window.api.stats.getTopAlbums(10),
          window.api.stats.getTopArtists(10)
        ]);
        libraryStats.value = library;
        daily.value = history;
        hourly.value = hourlyHistory;
        topSongs.value = songs;
        topAlbums.value = albums;
        topArtists.value = artists;
      } finally {
        loading.value = false;
      }
    });
    return (_ctx, _cache) => {
      const _component_StatsOverview = _sfc_main$1;
      const _component_StatsHeatmap = _sfc_main$2;
      const _component_StatsTopList = _sfc_main$4;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass(["mx-auto flex max-w-[1400px] flex-col gap-5 px-5 pt-2", unref(isFloatingBar) ? "pb-28" : "pb-10"])
        }, [
          createVNode(_component_StatsOverview, { stats: unref(libraryStats) }, null, 8, ["stats"]),
          createVNode(_component_StatsHeatmap, {
            daily: unref(daily),
            hourly: unref(hourly),
            stats: unref(libraryStats),
            loading: unref(loading)
          }, null, 8, ["daily", "hourly", "stats", "loading"]),
          createVNode(_component_StatsTopList, {
            songs: unref(topSongs),
            albums: unref(topAlbums),
            artists: unref(topArtists),
            loading: unref(loading)
          }, null, 8, ["songs", "albums", "artists", "loading"])
        ], 2)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
