namespace SSAH.Core
{
    public struct Constants
    {
        public struct UnitOfWork
        {
            public const string TOP_LEVEL_LIFETIME_SCOPE_TAG = nameof(TOP_LEVEL_LIFETIME_SCOPE_TAG);
            public const string REQUEST_CONTEXT_UNIT_OF_WORK_KEY = nameof(REQUEST_CONTEXT_UNIT_OF_WORK_KEY);
        }

        public struct StringLengths
        {
            public const int CODE = 30;
            public const int NAME = 200;
            public const int TEXT = 1000;
        }

        public struct NotificationIds
        {
            public const string ACCOMPLISH_DEMAND_FOR_REGISTRATION = nameof(ACCOMPLISH_DEMAND_FOR_REGISTRATION);
            public const string INSTRUCTOR_COURSE_CREATED = nameof(INSTRUCTOR_COURSE_CREATED);
        }
    }
}