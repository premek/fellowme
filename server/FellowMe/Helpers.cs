using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;
using System.Text;

namespace FellowMe
{
    public static class Helpers
    {
        public static String RemoveDiacritics(this String s)
        {
            if (String.IsNullOrEmpty(s))
            {
                return String.Empty;
            }

            String normalizedString = s.Normalize(NormalizationForm.FormD);
            StringBuilder stringBuilder = new StringBuilder();

            for (int i = 0; i < normalizedString.Length; i++)
            {
                Char c = normalizedString[i];
                if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                    stringBuilder.Append(c);
            }

            return stringBuilder.ToString();
        }

        public static bool Contains(this string source, string toCheck, StringComparison comp)
        {
            return source.IndexOf(toCheck, comp) >= 0;
        }

        public static int WeekNumber(this DateTime date)
        {
            GregorianCalendar cal = new GregorianCalendar(GregorianCalendarTypes.Localized);
            return cal.GetWeekOfYear(date, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
        }
    }
}