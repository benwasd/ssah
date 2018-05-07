namespace SSAH.Core
{
    public struct Constants
    {
        public struct UnitOfWork
        {
            public const string TOP_LEVEL_LIFETIME_SCOPE_TAG = "TOP_LEVEL_UNIT_OF_WORK";
            public const string REQUEST_CONTEXT_UNIT_OF_WORK_KEY = "REQUEST_CONTEXT_UNIT_OF_WORK_KEY";
        }

        public struct StringLengths
        {
            public const int CODE = 30;
            public const int NAME = 200;
            public const int TEXT = 1000;
        }
    }
}