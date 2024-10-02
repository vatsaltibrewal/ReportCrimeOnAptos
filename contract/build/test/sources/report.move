module crime_report::report {
    use std::string::String;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::signer;
    
    const ENO_REPORT_LIST: u64 = 1;

    struct Report has store, drop {
        timestamp: u64,
        crime_type: String,
        location: String,
        severity: String,
        message: String,
        from: address,
        solved: bool
    }

    struct ReportList has key {
        reports: vector<Report>,
    }



    // View all reports - return report data as individual vectors
    #[view]
    public entry fun view_reports(): (
        vector<u64>,    // timestamps
        vector<String>, // crime_types
        vector<String>, // locations
        vector<String>, // severities
        vector<String>, // messages
        vector<address>,// froms
        vector<bool>    // solveds
    ) acquires ReportList {
        assert!(exists<ReportList>(@crime_report), ENO_REPORT_LIST);
        
        let report_list = borrow_global<ReportList>(@crime_report);
        
        let timestamps = vector::empty<u64>();
        let crime_types = vector::empty<String>();
        let locations = vector::empty<String>();
        let severities = vector::empty<String>();
        let messages = vector::empty<String>();
        let froms = vector::empty<address>();
        let solveds = vector::empty<bool>();

        let i = 0;
        let len = vector::length(&report_list.reports);
        while (i < len) {
            let report = vector::borrow(&report_list.reports, i);
            vector::push_back(&mut timestamps, report.timestamp);
            vector::push_back(&mut crime_types, *&report.crime_type);
            vector::push_back(&mut locations, *&report.location);
            vector::push_back(&mut severities, *&report.severity);
            vector::push_back(&mut messages, *&report.message);
            vector::push_back(&mut froms, report.from);
            vector::push_back(&mut solveds, report.solved);
            i = i + 1;
        };
        
        (timestamps, crime_types, locations, severities, messages, froms, solveds)
    }

    // Report a crime
    public entry fun report_crime(
        account: &signer,
        crime_type: String,
        location: String,
        severity: String,
        message: String
    ) acquires ReportList {
        let addr = signer::address_of(account);
        
        if (!exists<ReportList>(@crime_report)) {
            move_to(account, ReportList {
                reports: vector::empty<Report>(),
            });
        };
        
        let report_list = borrow_global_mut<ReportList>(@crime_report);
        
        let new_report = Report {
            timestamp: timestamp::now_seconds(),
            crime_type,
            location,
            severity,
            message,
            from: addr,
            solved: false,
        };
        vector::push_back(&mut report_list.reports, new_report);
    }

    #[test_only]
    public fun setup_test(account: &signer) {
        init_module(account);
    }
}